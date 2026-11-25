import React, { useState } from 'react'
import { useReceipts } from '../../../context/ReceiptsContext';

export default function ReceiptForm() {
    const { addReceipt } = useReceipts();
      const [title, setTitle] = useState("");
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const cleanTitle = title.trim();
        if (!cleanTitle) return;
        addReceipt(cleanTitle);
        setTitle("");
    };
    

  return (
        <form onSubmit={handleSubmit} className="table-panel__toolbar">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  )
}
