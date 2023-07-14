import React from 'react'
import Link from 'next/link'


const Products = (props) => {
    return (
        <div className='products mx-auto px-4'>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full md:mb-20">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Product List - My Shop</h1>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {props.products.data.map((item) => {
                            return (
                                <div className="xl:w-1/4 md:w-1/2 p-4">
                                    <div className="bg-gray-100 p-6 rounded-lg">
                                        <img className="h-40 rounded w-full object-cover object-center mb-6" src={"http://localhost:1337" + `${item.attributes.image.data && item.attributes.image.data.attributes.url}`} alt="content" />
                                        <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{item.attributes.category}</h3>
                                        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item.attributes.title}</h2>
                                        <div className="hidden bg-red-800 bg-purple-800 bg-green-800 bg-blue-800 bg-yellow-800" ></div>
                                        <button className={" border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none " + `bg-${item.attributes.color}-800`}></button>
                                        <p class="leading-relaxed text-base">{item.attributes.description}</p>
                                        <Link href={`/products/${item.attributes.Slug}`}>
                                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Buy Now</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div> 
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    const headers = { Authorization: "Bearer 734aa325cd2093b22871f460e36eb47257bbfeec3847ca9288ef5e9a8d753b3002955aae7e7ef03a461a34f32407675bfea450fab6f02404604fb4ebdc992c55b208b46120acde78d9480bae0f02d01f0f20451290214f650b9abf9e8e11823b376ffbcc37b3624d74903748e44d0f55272c92012eadf463f1a124dbd6d1a7cb" }
    const a = await fetch('http://127.0.0.1:1337/api/products?populate=*', { headers: headers })
    const products = await a.json()
    console.log(products);
    return {
        props: { products: products }
    }
}

export default Products;