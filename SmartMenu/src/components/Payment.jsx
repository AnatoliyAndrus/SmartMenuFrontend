import Review from "./Review";

export default function Payment(){

    return (<div className="mt-4">
        <h2 className="text-center mb-4">Payment approved. Would you like to leave a review?</h2>
        <Review/>
    </div>)
}