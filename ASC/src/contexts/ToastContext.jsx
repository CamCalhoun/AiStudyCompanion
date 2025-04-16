import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, duration = 5000) => {
        const id = Date.now()
        setToasts((prev) => [...prev, { id, message }])
        setTimeout(() => removeToast(id), duration)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className='fixed bottom-4 right-4 flex flex-col-reverse gap-2 z-50'>
                {toasts.map(({ id, message }) => (
                    <div key={id} className="bg-pwblue border-3 border-pwred rounded-xl text-white px-8 py-5 rounded-xl shadow-2xl flex items-center justify-between min-w-[300px] animate-slideIn">
                        <span className='text-xl'>{message}</span>
                        <button className='text-2xl' onClick={() => removeToast(id)}>x</button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )

}

export const useToast = () => useContext(ToastContext)
