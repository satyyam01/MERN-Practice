import { useState, useEffect } from 'react';

export default function PostEditor({ onSubmit, initial = {}, submitLabel = 'Submit' }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    categories: '',
    ...initial,
  });

  useEffect(() => {
    setForm({
      title: initial.title || '',
      content: initial.content || '',
      categories: initial.categories ? initial.categories.join(', ') : '',
    });
  }, [initial]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      ...form,
      categories: form.categories.split(',').map(c => c.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
      />
      <input
        name="categories"
        placeholder="Categories (comma separated)"
        value={form.categories}
        onChange={handleChange}
      />
      <button type="submit">{submitLabel}</button>
    </form>
  );
} 