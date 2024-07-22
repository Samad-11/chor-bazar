import { calculateAverageRating, getAverage } from "@/utils/supportFunctions";
import { Review } from "@prisma/client";

const Rating = ({ name, reviews, directRating }: { name?: string, reviews?: Review[], directRating?: number }) => {

    const ratings = [1, 2, 3, 4, 5]
    const average = reviews ? calculateAverageRating(reviews) : (directRating) ? directRating : 0
    return (
        <div className='rating'>
            {
                ratings.map((r, i) => (
                    <input key={i} className={`mask mask-star-2 disabled cursor-default ${average >= r ? "bg-secondary" : "bg-slate-400"}`} />
                ))

            }
        </div>
    )
}

export default Rating