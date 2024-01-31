import { ReactNode } from 'react'

interface ModalProps {
    children: ReactNode
}

const ModalSection = ({ children }: ModalProps) => {
    return (
        <div className='flex items-center justify-center bg-black/50 fixed top-0 left-0 w-screen h-screen p-4 z-50 '>
            {children}
        </div>
    )
}

export default ModalSection