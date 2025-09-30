import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import styles from '@/styles/LeadForm.module.css';

const initialState = { name: '', email: '', message: '' };

export default function LeadForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const validators = useMemo(
    () => ({
      name: (value) => (value.trim().length < 2 ? 'Please provide your name' : null),
      email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Enter a valid email'),
      message: (value) => (value.length > 500 ? 'Message is limited to 500 characters' : null)
    }),
    []
  );

  useEffect(() => {
    const newErrors = {};
    Object.entries(values).forEach(([field, value]) => {
      const validator = validators[field];
      if (!validator) return;
      const error = validator(value);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
  }, [values, validators]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await axios.post(`${baseUrl}/api/leads`, values, {
        timeout: 4000
      });
      setStatus('success');
      setMessage(response.data.message);
      setValues(initialState);
    } catch (error) {
      setStatus('error');
      const detail = error.response?.data?.message || 'We hit a snag. Try again shortly.';
      setMessage(detail);
    }
  };

  const isValid = Object.keys(errors).length === 0 && values.email && values.name;

  return (
    <section className={styles.section} id="preorder">
      <div className={styles.inner}>
        <h2>Reserve your EcoFlow Bottle</h2>
        <p>Share your details and we&apos;ll notify you with exclusive launch pricing.</p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={values.name} onChange={handleChange} placeholder="Jordan Lee" required />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={values.email} onChange={handleChange} placeholder="you@example.com" required />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={values.message} onChange={handleChange} placeholder="Tell us what features you&apos;re excited about" maxLength={500} />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>
          <button type="submit" disabled={!isValid || status === 'submitting'}>
            {status === 'submitting' ? 'Submitting…' : 'Notify me'}
          </button>
          {message && <p className={`${styles.feedback} ${status === 'error' ? styles.errorText : styles.successText}`}>{message}</p>}
        </form>
      </div>
    </section>
  );
}
