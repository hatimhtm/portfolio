import { describe, it, expect } from 'vitest';
import { getProjectBySlug, projects } from './projects';

describe('getProjectBySlug', () => {
    it('should return the correct project for a valid slug', () => {
        if (projects.length === 0) {
            console.warn('No projects available to test');
            return;
        }
        const slug = projects[0].slug;
        const project = getProjectBySlug(slug);
        expect(project).toBeDefined();
        expect(project?.slug).toBe(slug);
    });

    it('should return undefined for a non-existent slug', () => {
        const slug = 'non-existent-slug';
        const project = getProjectBySlug(slug);
        expect(project).toBeUndefined();
    });
});
