import "../Education/styling/Education.css";

interface ContactThankYouProps {
    name: string;
    onClose: () => void;
}

function ContactThankYou({ name, onClose }: ContactThankYouProps) {
    return (
        <div className="max-w-[500px] w-[90vw] rounded-lg bg-slate-800 text-slate-100 p-8">
            <h2 className="mb-4 text-slate-100 text-2xl font-bold text-center">
                Thank You!
            </h2>
            <p className="text-lg text-center mb-6">
                Thank You {name.trim()} for contacting me. I will make sure to
                be in touch with you as soon as possible.
            </p>
            <div className="flex justify-center">
                <button onClick={onClose} className="MoreDetailsButton">
                    Close
                </button>
            </div>
        </div>
    );
}

export default ContactThankYou;
