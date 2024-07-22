'use client'
import Image from 'next/image'
import { numberToCurrency } from '@/utils/supportFunctions'
import { useRouter } from 'next/navigation'
import { ProductWithCategory } from '@/types/types'

const ProductTableRow = ({ product, sno }: { product: ProductWithCategory, sno: number }) => {
    const router = useRouter()

    return (
        <tr
            onClick={() => {
                router.push(`/shop/${product.id}`)
            }}
            className='hover:cursor-pointer'
        >
            <th>
                {sno}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className=" h-12 w-12 relative">
                            <Image
                                src={`https://abdus-samad-bucket-1.s3.ap-southeast-2.amazonaws.com/${product.colors[0].images[0]}`}
                                fill
                                className='object-fill'
                                alt={'product Image'} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{product.name}</div>
                        <div className="text-sm opacity-50">{product.category.name}</div>
                    </div>
                </div>
            </td>
            <td>
                {numberToCurrency(product.price)}
                <br />
                <span className="badge badge-ghost badge-sm">{product.brand}</span>
            </td>
            <td>{product.inStock ? "In Stock" : "Out of Stock"}</td>
            <th>
                <button className="btn btn-ghost btn-xs">{"..."}</button>
            </th>
        </tr>
    )
}

export default ProductTableRow