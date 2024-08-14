import '../style/keypad.css'

export default function KeypadUserInput({ userInput }) {
    const input_len = userInput.length;

    return (
        <>
            <div className="input-group-style">
                {userInput.map((key, index) => (<span key={index} className="input-style">0</span>))}
                {Array.from({ length: 6 - input_len }, (_, index) => (
                    <span key={input_len + index} className="input-style">_</span>
                ))}
            </div>
        </>
    );
}
