type ImageModalProps = {
    onClose: () => void;
  };
  
  function ImageModal({ onClose }: ImageModalProps) {
    return (
      <div className="bg-white p-6 rounded-xl w-96 mx-auto mt-40">
        <h2 className="text-xl font-bold mb-4">Image Viewer</h2>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    );
  }
  
  export default ImageModal;