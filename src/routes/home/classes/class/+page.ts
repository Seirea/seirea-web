import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { authAndInitialize } from '$lib/api';

export const load: PageLoad = async ({ url }) => {
    let classId = url.searchParams.get('classId');

    return { classId: classId ? parseInt(classId) : null };
}