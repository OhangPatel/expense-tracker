export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Profile Page</h1>
            <hr />
            <p className="text-4xl">
                Profile Page
                <span className="p-2 rounded bg-blue-500 text-black">
                    {params.id}
                </span>
            </p>
        </div>
    );
}
