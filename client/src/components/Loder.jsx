const Loder = ({ loadingMessage }) =>  {
    return (
        <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                </div>
                <div className="text-2xl font-light text-violet-900 tracking-wide">{loadingMessage}</div>
            </div>
        </div>
    );
}

export default Loder