// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints



export const postsApi = createApi({

  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/",
  prepareHeaders: (headers, {getState}) => {
   //const token = getState().auth.token;
    if(localStorage.getItem('profile')) {
     headers.set('Authorization', `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`)
    }
    return headers;
  }
}),
  
  tagTypes: ['Posts', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ()  => '/posts',
     // providesTags: ['Post'],
     // transformResponse: res => res.sort((a, b) => a.id - b.id),
     providesTags: (result) => result ? [...result.map(({id}) => ({type: 'Posts', id })),
     {type: 'Posts', id: 'LIST'},]: [{ type: 'Posts', id: 'LIST'}],
    }),
    
    getPostBySearch: builder.query({
      query: (searchQuery) => `/posts/search?searchQuery=${searchQuery.search || 'none'}`,
     //providesTags: ['Post'],
      providesTags: (result, error, id) =>  [{ type:'Posts', id}],
    }),

        getPost: builder.query({
          query: (id) => `/posts/${id}`,
         //providesTags: ['Post'],
          providesTags: (result, error, id) =>  [{ type:'Posts', id}],
         
        }),

        
     addPost: builder.mutation({
      query(body) {
        return {
        url: '/posts',
        method: 'POST',
        body,
      }
       },
       //invalidatesTags: ['Post'],
        invalidatesTags: [{type: 'Posts', id: 'LIST'}],
     }),

     updatePost: builder.mutation({
        query(data) {
          const { id, ...body} = data
          return {
          url: `/posts/${id}`,
          method: 'PATCH',
          body,  
          }
         },
         //invalidatesTags: ['Post'],
         invalidatesTags:  (result, error, {id}) => [{ type: 'Posts', id }],
       }),
       deletePost: builder.mutation({
        query(id) {
          return {
            url: `/posts/${id}`,
          method: 'DELETE'
          }
        },
        //invalidatesTags: ['Post'],
       invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
         }),

         likePost: builder.mutation({
          query(id) {
            return {
            url: `/posts/${id}/likePost`,
            method: 'PATCH',
            }
           },
          // invalidatesTags: ['Post'],
         invalidatesTags:  (result, error, {id}) => [{ type: 'Posts', id }],
         }),

         authLog: builder.mutation({
          query: (body) => {
            return {
            url: '/users/signin',
            method: 'POST',
            body,
          }
           },
           invalidatesTags: ['User'],
         }),
  
         authReg: builder.mutation({
          query: (body) => {
            return {
            url: '/users/signup', 
            method: 'POST',
            body,
          }
           },
           invalidatesTags: ['User'],
         }),
  
        
       }),
})

export const { 
    useGetPostsQuery,
    useGetPostQuery, 
    useAddPostMutation, 
    useUpdatePostMutation,
    useDeletePostMutation,
    useLikePostMutation,
    useAuthRegMutation,
    useAuthLogMutation,
    useGetPostBySearchQuery,
 } = postsApi