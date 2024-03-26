export default function Checkbox({value, onChange}) {
    return<>
    <li className='list-group-item'>
        <input
        type='checkbox'
        value={value}
        id={value}
        onChange={onChange}
              />
        <span className='px-3'>{value}</span>
        </li>
    </>
}