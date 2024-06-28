// @vitest-environment jsdom
import { render } from '@testing-library/vue';
import type { Meta, StoryFn } from '@storybook/vue3';
import { beforeAll, beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { composeStories } from '@storybook/vue3';
import { i18n } from '@/app/plugins/i18n';
import router from '@/app/router';
import * as path from 'path';

beforeAll(() => {
    const ResizeObserverMock = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
});

beforeEach(() => {
    vi.mock('vue-router', async (importOriginal) => {
        const originalModule = await importOriginal<typeof import('vue-router')>();
        return {
            ...originalModule,
            useRoute: vi.fn(() => ({
                name: 'mocked-current-route',
                query: {},
            })),
            onBeforeRouteLeave: vi.fn(),
            useLink: () => ({ href: { value: '/mocked-href' } }),
            useRouter: vi.fn(() => ({
                push: vi.fn(),
                currentRoute: { value: { name: 'mocked-current-route', query: {} } },
            })),
        };
    });
});

afterEach(() => {
    vi.clearAllMocks();
});

const mockDynamicAttributes = (container: Element) => {
    container
        .querySelectorAll('[aria-describedby], [aria-labelledby], [aria-owns], [id]')
        .forEach((element) => {
            if (element.hasAttribute('aria-describedby')) {
                element.setAttribute('aria-describedby', 'mocked-aria-describedby');
            }

            if (element.hasAttribute('aria-labelledby')) {
                element.setAttribute('aria-labelledby', 'mocked-aria-labelledby');
            }

            if (element.hasAttribute('aria-owns')) {
                element.setAttribute('aria-owns', 'mocked-aria-owns');
            }

            if (element.hasAttribute('id')) {
                element.id = 'mocked-id';
            }
        });
};

// https://storybook.js.org/docs/writing-tests/storyshots-migration-guide#vitest
type StoryFile = {
    default: Meta;
    [name: string]: StoryFn | Meta;
};

const compose = (entry: StoryFile): ReturnType<typeof composeStories<StoryFile>> => {
    try {
        return composeStories(entry);
    } catch (e) {
        throw new Error(
            `There was an issue composing stories for the module: ${JSON.stringify(entry)}, ${e}`,
        );
    }
};

function getAllStoryFiles() {
    const storyFiles = Object.entries(
        import.meta.glob<StoryFile>('./**/*.(stories|story).@(js|jsx|mjs|ts|tsx)', {
            eager: true,
        }),
    );

    return storyFiles.map(([filePath, storyFile]) => {
        const storyDir = path.dirname(filePath);
        const componentName = path.basename(filePath).replace(/\.(stories|story)\.[^/.]+$/, '');
        return { filePath, storyFile, componentName, storyDir };
    });
}

const options = {
    suite: 'Storybook Tests',
    storyKindRegex: /^.*?DontTest$/,
    storyNameRegex: /UNSET/,
    snapshotsDirName: '__snapshots__',
    snapshotExtension: '.storyshot',
};

describe(options.suite, () => {
    getAllStoryFiles().forEach(({ storyFile, componentName, storyDir }) => {
        const meta = storyFile.default;
        const title = meta.title || componentName;

        if (options.storyKindRegex.test(title) || meta.parameters?.storyshots?.disable) return;

        describe(title, () => {
            const stories = Object.entries(compose(storyFile))
                .map(([name, story]) => ({ name, story }))
                .filter(({ name, story }) => {
                    return (
                        !options.storyNameRegex?.test(name) && !story.parameters.storyshots?.disable
                    );
                });

            if (stories.length <= 0) {
                throw new Error(
                    `No stories found for this module: ${title}. Make sure there is at least one valid story for this module, without a disable parameter, or add parameters.storyshots.disable in the default export of this file.`,
                );
            }

            stories.forEach(({ name, story }) => {
                const testFn = story.parameters.storyshots?.skip ? test.skip : test;
                setActivePinia(createPinia());

                testFn(name, async () => {
                    //this works as shallow mount wrapper -> https://test-utils.vuejs.org/api/#global
                    const mounted = render(story, {
                        global: {
                            plugins: [i18n, router],
                        },
                    });

                    await new Promise((resolve) => setTimeout(resolve, 100));

                    const snapshotPath = path.join(
                        storyDir,
                        options.snapshotsDirName,
                        `${componentName}${options.snapshotExtension}`,
                    );

                    mockDynamicAttributes(mounted.container);
                    expect(mounted.container).toMatchFileSnapshot(snapshotPath);
                });
            });
        });
    });
});
