import React from "react";
import Layout from "../components/layout";
import Header from "../components/header";


export const Story = () => {
    return (
        <>
            <Header/>
            <Layout>
                <section className={"editorial-content one-col"}>

                    {/*<article className={"box feature box-padding flex-group"}>*/}
                    {/*    <div>*/}
                    {/*        <TwitterTweetEmbed tweetId={"1126506339075641344"}/>*/}
                    {/*        <TwitterTweetEmbed tweetId={"1392526628438302721"}/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <TwitterTweetEmbed tweetId={"1398068623269191681"}/>*/}
                    {/*        <TwitterTweetEmbed tweetId={"1220875073252401153"}/>*/}
                    {/*    </div>*/}
                    {/*</article>*/}

                    <article className={"box feature box-padding"}>

                        <p className={"feature"}>Unisocks was launched on May 9, 2019, when 500 $SOCKS tokens and 35
                            $ETH were deposited into
                            a uniswap liquidity pool</p>
                        <p>Each $SOCK redeemed from the pool increases the price of the remaining ones, creating the
                            following price curve. The price of $ETH at the time of the original release was $170.</p>

                        <img src={"https://pbs.twimg.com/media/D6IjysLWsAAE_Xa?format=png"} alt={"price chart"}/>

                        <p>$SOCKS can be sold back into the pool to receive $ETH according to the same formula, or
                            burned in order to redeem one pair of physical Unisocks.</p>
                    </article>

                    {/*<article className={"box feature box-padding flex-group"}>*/}
                    {/*    <div>*/}
                    {/*        <TwitterTweetEmbed tweetId={"1143233945053663232"}/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <TwitterTweetEmbed tweetId={"1395496386318290952"}/>*/}
                    {/*    </div>*/}
                    {/*</article>*/}
                    <article className={"box feature box-padding margin-bottom-5"}>
                        <p className={"feature"}>At the time of writing, 20 $SOCKS remain in the <a href={"https://unisocks.exchange/"} target={"_blank"} rel="noopener noreferrer">original pool</a>, with a current price for the next one at $62,366k</p>
                        <p>A total of 305 $SOCKS are in circulation. Besides redeeming them from the
                            bonding curve pool, $SOCKS can be traded on secondary markets, such as regular <a href={"https://info.uniswap.org/#/pools/0xc75a99fa00803896349891f8471da3614bd07564"} target={"_blank"} rel="noopener noreferrer">xyk pools</a> on
                            Uniswap.</p>
                        <p>There are currently ~10 $SOCKS of liquidity in the UniV3 SOCKS-ETH pool, and
                            another 1 $SOCK in the same UniV2 pool.</p>

                        <p>SOCKS-ETH was ranging around 0.1-1.0 until mid September 2020, where it jumped to a height of
                            $7843 (~20 $ETH, price of eth is $370) on September 20.</p>

                        <p>From there on socks entered a winter phase, reaching a low of 3 $ETH/SOCK in January 2021,
                            from where it went on a run to its current ATH of $161k (100 $ETH) on March 3, 2021.</p>
                    </article>
                </section>
            </Layout>
        </>
    )
}
