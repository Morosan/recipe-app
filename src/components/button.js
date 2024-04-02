import Spinner from 'react-bootstrap/Spinner';

export const Button = ({ text, className, type, onSubmit, isLoading, onClick }) => {
    return (
        <button 
            className={`button ${className}`} 
            type={type} 
            onSubmit={onSubmit}
            onClick={onClick}
        >
            { isLoading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                text 
            }
        </button>
    )
  }
  
  