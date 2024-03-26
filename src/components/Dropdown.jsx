export default function Dropdown({ optionArray, setVariable}) {
    return<>
    <select onChange={(event)=>setVariable(event.target.value)}>        
        <option value="">--Please choose an option--</option>
        {optionArray.map((tag) => <option value={tag} key={tag}>{tag}</option>)}
    </select>
    </>
}