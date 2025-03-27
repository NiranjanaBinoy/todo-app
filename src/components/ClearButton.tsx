
const ClearButton = ( { handleDeletion }: { handleDeletion: () => void } ) => {
    return (
        <div className="footer-container">
            <button className='clear-button' onClick={handleDeletion}>Clear Completed Tasks</button>
        </div>
    )
}

export default ClearButton;