import React from "react";

interface AdviceCardProps {
    title: string;
    description: string;
    image?: React.ReactNode;
    reverse?: boolean;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ title, description, image, reverse }) => {
    // Determine if image is a span (placeholder)
    const isSpan = image && (image as React.ReactElement)?.type === 'span';
    return (
        <div className={`flex flex-col sm:flex-row ${reverse ? 'sm:flex-row-reverse' : ''} gap-6 items-center bg-white rounded-xl`}>
            <div className={`w-full sm:w-1/2 ${isSpan ? 'bg-[#D0D0D0]' : ''} h-[250px]  md:h-[400px] md:max-w-[600px] flex-shrink-0 flex items-center justify-center rounded-md`}>
                {image ? (
                    <div className="flex-1 flex items-center justify-center  h-[400px] text-gray-400 text-lg font-semibold">
                        {image}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center max-w-[600px] max-h-[400px] bg-gray-100 rounded-md text-gray-400 text-lg font-semibold">
                        Image Here
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start md:flex-1 w-full  sm:w-1/2 px-0 sm:px-[32px]">
                <h3 className="font-bold text-[28px] mb-2 text-center ">{title}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line text-center sm:text-left">{description}</p>
            </div>

        </div>
    );
};

export default AdviceCard;
