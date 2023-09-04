import addIcon from '../../assets/add-icon.svg'

export default function TableBalance({title, data}){

    const bodyData = data[Object.keys(data)[0]]

    return(
        <article className="container-fluid">

            <div style={{backgroundColor:'#62D4E3'}} className='d-flex justify-content-between align-items-center p-1 container-fluid rounded-top'>
                <h4 className='m-0'>{title}</h4>
                <button className="btn">
                    <img src={addIcon} width={30} alt="" />
                </button>
            </div>

            <table className='container-fluid'>
                <tbody>
                {
                bodyData?.map((item, index)=>(
                    <tr key={`${item.name}_${index}`} style={{backgroundColor:'#d8fdff'}} className='d-flex'>
                        <td className='d-flex align-items-center justify-content-center container-fluid border border-end-0'>{item.name}</td>
                        <td className='d-flex align-items-center justify-content-center container-fluid border border-start-0'>{item.value}</td>
                    </tr>
                ))
                }
                </tbody>

            </table>
            
        </article>
    )
}