
const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <svg
                width="50"
                height="50"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="50" cy="50" r="45" strokeOpacity="0.25" />
                <path d="M50 5a45 45 0 0 1 0 90" strokeDasharray="282.6" strokeDashoffset="0">
                    <animate
                        attributeName="stroke-dashoffset"
                        begin="0s"
                        dur="2s"
                        repeatCount="indefinite"
                        values="0;141.3;282.6;141.3;0"
                        keyTimes="0; 0.5; 1; 1.5; 2"
                    />
                </path>
            </svg>
        </div>
    );
};

export default Loader;
