'use client'

import { useFormStatus } from "react-dom"

const SubmitButton = () => {
    const { pending } = useFormStatus()
    return (
        <button type="submit"
            disabled={pending}
            aria-disabled={pending}
            className="btn btn-primary btn-block mt-3"
        >
            {
                pending ? <span className="loading loading-spinner"></span> :
                    "Add Product"
            }
        </button>
    )
}

export default SubmitButton