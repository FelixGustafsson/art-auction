export default function ProfilePageItem({title, bidText, bidAmount, description, image, id}) {
    return <>
        <div className="row" key={id}>
            <div className="col"><img src={image} className='w-100 h-auto rounded-5'/></div>
            <div className="col-8">
                <h4>{title}</h4>
                <div>{bidText}{bidAmount ? bidAmount : description}</div>
            </div>
        </div>
    </>
}