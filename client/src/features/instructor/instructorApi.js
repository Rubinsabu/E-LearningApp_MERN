import { apiSlice } from '../api/apiSlice';

export const instructorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyCourses: builder.query({
      query: () => '/instructor/courses/my-courses',
      providesTags: ['Course'],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: '/instructor/courses',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/instructor/courses/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/instructor/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useGetMyCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = instructorApi;
