import '../style/keypad.css'

export default function SecureKeypad({ keypad, onKeyPressed }) {
    const grid = [];
    for (let i = 0; i < 3; i++) {
        const row = keypad.keyData.slice(i * 4, i * 4 + 4);
        grid.push(row);
    }

    const renderButton = (key, index) => {
        const rowIndex = Math.floor(index / 4);
        const colIndex = index % 4;

        // Calculate background position for a 4x3 grid
        const backgroundPosition = `${colIndex * (100 / (4 - 1))}% ${rowIndex * (100 / (3 - 1))}%`;

        return (
            <td className="td-style">
                <button 
                    className="button-style" 
                    onClick={() => onKeyPressed(rowIndex, colIndex)}
                    style={{ 
                        backgroundImage: `url(${keypad.keypadImage})`, 
                        backgroundPosition: backgroundPosition, 
                        backgroundSize: `${4 * 100}% ${3 * 100}%` 
                    }}
                >
                    <span className="number-style"></span>
                </button>
            </td>
        );
    };

    return (
        <div className="keypad-container">
            <table className="table-style">
                <tbody>
                    {grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((key, index) => renderButton(key, rowIndex * 4 + index))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
