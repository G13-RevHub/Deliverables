

const Footer = ({banane, mele}:{banane:number|null, mele:number}) => {
    return (
        <div className="bg-black text-white text-[30px] flex justify-center items-center bottom-0 w-full h-20">
            <h1>Footer</h1>
            {banane && banane > mele ?
            <p>le banane sono meglio delle mele</p>
            :
            <p>le mele sono meglio delle banane</p>
            }
        </div>
    )
}

export default Footer