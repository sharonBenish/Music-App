const initToast: Toast = {
    message: '',
    type: 'success',
    isVisible: false
}

interface Toast {
    message: string
    type: 'error' | 'success' |'warning'
    isVisible: boolean
}

export default function useToast(){
    const toast = useState<Toast>('toast', () => initToast)

    function showToast (message: string, type: 'error'| 'success' | 'warning'){
        toast.value = {
            message,
            type,
            isVisible: true
        }
    
        setTimeout(()=>{
            toast.value = initToast
        }, 2000)
    }

    return {
        toast,
        showToast
    }
}