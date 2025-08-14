import React, { useState } from 'react'

const FormPage: React.FC = () => {
	const [points, setPoints] = useState([
		{ x: '', y: '' },
		{ x: '', y: '' },
		{ x: '', y: '' },
	])

	const handleChange = (idx: number, field: 'x' | 'y', value: string) => {
		setPoints(prev =>
			prev.map((pt, i) => (i === idx ? { ...pt, [field]: value } : pt))
		)
	}

	const handleShowTriangle = (e: React.FormEvent) => {
		e.preventDefault()
		const params = points
			.map(
				(pt, i) =>
					`x${i + 1}=${encodeURIComponent(pt.x)}&y${
						i + 1
					}=${encodeURIComponent(pt.y)}`
			)
			.join('&')
		window.location.href = `/show?${params}`
	}

	return (
		<div style={{ padding: 32 }}>
			<h1>Enter 3 Points</h1>
			<form onSubmit={handleShowTriangle}>
				{[0, 1, 2].map(i => (
					<div key={i} style={{ marginBottom: 12 }}>
						<label style={{ marginRight: 8 }}>Point {i + 1}:</label>
						<input
							type='number'
							placeholder={`X${i + 1}`}
							value={points[i].x}
							onChange={e => handleChange(i, 'x', e.target.value)}
							required
							style={{ width: 60, marginRight: 8 }}
						/>
						<input
							type='number'
							placeholder={`Y${i + 1}`}
							value={points[i].y}
							onChange={e => handleChange(i, 'y', e.target.value)}
							required
							style={{ width: 60 }}
						/>
					</div>
				))}
				<button type='submit' style={{ marginTop: 16 }}>
					Show Triangle
				</button>
			</form>
		</div>
	)
}

export default FormPage
