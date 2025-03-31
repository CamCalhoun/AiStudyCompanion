const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export const API_HELLO = `${BASE_URL}/api/hello`
export const API_ADD_SUBJECT = `${BASE_URL}/api/add_subject`
export const API_GENERATE_QUESTION = `${BASE_URL}/api/generate_question`
export const API_GENERATE_FLASHCARDS = `${BASE_URL}/api/generate_flashcards`
export const API_EXPORT = `${BASE_URL}/api/export`
