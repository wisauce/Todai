import { useState } from "react";

const DeleteConfirmation = ({
onDelete,
onCancel,
}: {
onDelete: () => void;
onCancel: () => void;
}) => {
const [isExiting, setIsExiting] = useState(false);

const handleDelete = () => {
    setIsExiting(true);
    setTimeout(() => {
    onDelete();
    }, 300);
};
    
const handleCancel = () => {
    setIsExiting(true);
    setTimeout(() => {
    onCancel();
    }, 300);
};

return (
    <div
    className={`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300 ${
        isExiting ? "opacity-0" : "opacity-100"
    }`}
    >
    <div
        className={`bg-white p-6 rounded shadow-lg transform transition-all duration-300 ${
        isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
    >
        <h2 className="text-lg font-semibold mb-4">Delete Entry</h2>
        <p className="mb-4">Are you sure you want to delete this entry?</p>
        <div className="flex justify-end space-x-2">
        <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
            Cancel
        </button>
        <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
            Delete
        </button>
        </div>
    </div>
    </div>
);
};

export default DeleteConfirmation;
