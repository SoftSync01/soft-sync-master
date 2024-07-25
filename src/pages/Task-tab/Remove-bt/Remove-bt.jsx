import "./Remove-bt.css";

export const RemoveBt = ({ onRemove }) => {
  return (
    <button onClick={onRemove} className="button">
      Remove
    </button>
  );
};
