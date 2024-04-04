import { useNavigate } from "react-router-dom"
import { FetchContext } from "../../contexts/FetchContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext } from "react";

export default function ProfilePageItem({title, bidText, bidAmount, description, image, itemId, deleteButton, setSavedAuctions }) {
    const redirect = useNavigate();
    const { getFetchGeneral, fetchGeneral } = useContext(FetchContext)
    const { login, setLogin } = useContext(GlobalContext)

    const handleDelete = async (id) => {
        const user = await getFetchGeneral(`/users/${login.id}`)
        const oldSavedAuctions = user.savedAuctions
        const newAuctionList = oldSavedAuctions.filter((auction) => auction.itemId !== id)
        console.log(newAuctionList)
        const body = {'savedAuctions': newAuctionList}
        const result = await fetchGeneral(`/users/${login.id}`, 'PATCH', body)
        result.ok && setLogin(await getFetchGeneral(`/users/${login.id}`))
        result.ok && setSavedAuctions(newAuctionList)
    }

    return <>
        {deleteButton && <button className="btn btn-sm btn-outline-danger float-end" onClick={()=>handleDelete(itemId)}>x</button>}
        <div className="row mb-4" key={itemId} onClick={()=>redirect(`/info/${itemId}`)}>
            <div className="col"><img src={image} className='w-100 h-auto rounded-5'/></div>
            <div className="col-8">
                <h4>{title}</h4>
                <div>{bidText}{bidAmount ? bidAmount : description}</div>
            </div>

        </div>
    </>
}