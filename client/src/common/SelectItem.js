import React from 'react'

import './Form.css'

const SelectItem = ({ name, value, label, error, onChange, items }) => {
	const selectStyles = 'select'
	return (
		<div className='input__item'>
			<label className='label' htmlFor={name}>
				{label}
			</label>

			<select
				className={error ? selectStyles + ' select__error' : selectStyles}
				name={name}
				value={value}
				onChange={onChange}>
				{items.map(item => {
					return (
						<option key={item._id} value={item._id}>
							{item.name}
						</option>
					)
				})}
			</select>

			{error && <span className='input__message'>{error}</span>}
		</div>
	)
}

SelectItem.defaultProps = {
	value : ''
}

export default SelectItem
