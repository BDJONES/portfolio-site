import { useState } from "react";
import ContactThankYou from "./ContactThankYou";

interface ContactFormProps {
    backdropClose: () => void;
}

function ContactForm({ backdropClose }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        message: false,
    });
    const [showThankYou, setShowThankYou] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange =
        (field: string) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData({ ...formData, [field]: event.target.value });
            // Clear error when user starts typing
            if (field === "name" || field === "email" || field === "message") {
                setErrors({ ...errors, [field]: false });
            }
        };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validate required fields
        const newErrors = {
            name: !formData.name.trim(),
            email: !formData.email.trim() || !validateEmail(formData.email),
            message: !formData.message.trim(),
        };

        setErrors(newErrors);
        setSubmitError(null);

        // If no errors, submit the form
        if (!newErrors.name && !newErrors.email && !newErrors.message) {
            setIsSubmitting(true);
            
            try {
                const response = await fetch('http://localhost:3001/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (data.success) {
                    setShowThankYou(true);
                } else {
                    setSubmitError(data.error || 'Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                setSubmitError('Unable to connect to server. Please try again later.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleCloseThankYou = () => {
        // Close the form backdrop immediately (component will unmount, so no need to reset state)
        backdropClose();
    };

    // Show thank you popup if form was successfully submitted
    if (showThankYou) {
        return (
            <ContactThankYou
                name={formData.name}
                onClose={handleCloseThankYou}
            />
        );
    }

    return (
        <div className="max-w-[700px] w-[90vw] rounded-2xl border border-slate-700 bg-slate-800 text-slate-100 p-8 shadow-lg">
            <h2 className="mb-6 text-slate-100 text-2xl font-bold">Contact Me</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-slate-100 text-sm font-medium">
                        Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        required={true}
                        value={formData.name}
                        onChange={handleChange("name")}
                        placeholder="Ex. John Doe"
                        className={`w-full px-4 py-2 bg-slate-700 text-slate-100 placeholder-slate-400 border rounded ${
                            errors.name
                                ? "border-red-500"
                                : "border-slate-600 hover:border-slate-500 focus:border-violet-400"
                        } focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-colors`}
                    />
                    {errors.name && (
                        <span className="text-red-400 text-sm">
                            Name is required
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-slate-100 text-sm font-medium">
                        Email <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="email"
                        required={true}
                        value={formData.email}
                        onChange={handleChange("email")}
                        placeholder="Ex. john.doe@email.com"
                        className={`w-full px-4 py-2 bg-slate-700 text-slate-100 placeholder-slate-400 border rounded ${
                            errors.email
                                ? "border-red-500"
                                : "border-slate-600 hover:border-slate-500 focus:border-violet-400"
                        } focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-colors`}
                    />
                    {errors.email && (
                        <span className="text-red-400 text-sm">
                            Valid email is required
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-slate-100 text-sm font-medium">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        required={false}
                        value={formData.phone}
                        onChange={handleChange("phone")}
                        placeholder="Ex. (555) 123-4567"
                        className="w-full px-4 py-2 bg-slate-700 text-slate-100 placeholder-slate-400 border border-slate-600 rounded hover:border-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-colors"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-slate-100 text-sm font-medium">
                        Message
                        <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        rows={4}
                        required={true}
                        value={formData.message}
                        onChange={handleChange("message")}
                        placeholder="Ex. Hi Brandon, I'd love to connect about..."
                        className={`w-full px-4 py-2 bg-slate-700 text-slate-100 placeholder-slate-400 border rounded ${
                            errors.message
                                ? "border-red-500"
                                : "border-slate-600 hover:border-slate-500 focus:border-violet-400"
                        } focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-colors resize-none`}
                    />
                    {errors.message && (
                        <span className="text-red-400 text-sm">
                            Message is required
                        </span>
                    )}
                </div>
                {submitError && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded text-sm">
                        {submitError}
                    </div>
                )}
                <div className="flex flex-row gap-4 justify-end mt-4">
                    <button
                        type="button"
                        onClick={backdropClose}
                        className="MoreDetailsButton"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="MoreDetailsButton"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
