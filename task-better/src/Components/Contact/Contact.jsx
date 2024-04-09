import React, { useState } from 'react';
import "./Contact.css"
const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });

    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
    }


return (
    <div>
        <div className="contact-container">
            <div className="contact-title">
                Contact Us
            </div>
            <div className="contact-fields">
                <div className="contact-field">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                </div>
                <div className="contact-field">
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="contact-field">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="contact-field">
                <div className="message-field">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message here"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                </div>
                <div className="contact-submit">
                    <div className="contact-submit-button" onClick={handleSubmit}>Send Message!</div>
                </div>
            </div>
        </div>
    </div>
)
}
export default ContactPage;