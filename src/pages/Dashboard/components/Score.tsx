const Score = (props:{points: number}) =>{
    return (
        <div className="Points">
        <p> Total of Suitability Score </p>
        <div> {props.points} </div>
        <br/>
        </div>
    )
}
export default Score;