"use client"

import { Search } from "lucide-react"
import React, { Dispatch, SetStateAction, useState } from "react"
import { toast } from "react-toastify"

export default function Searchpage() {
    const [searchHovered, setSearchHovered] = useState<boolean>(false)
    const [typedParams, setTypedParams] = useState<string>("")
    const [searchResults, setSearchResults] = useState<any[]>([])

    const submitForm = async () => {
        toast.info("此功能尚未開放")
    }

    return (
        <div className="flex flex-col px-2 py-5 w-full">
            <form className="flex flex-row justify-center w-full"
                onSubmit={event => {
                    event.preventDefault();
                    submitForm()
                }}>
                <input type="text"
                    placeholder="搜尋任何東西"
                    className="w-4/5 p-2 rounded-md"
                    onFocus={() => {
                        setSearchHovered(true)
                    }}
                    onBlur={() => {
                        setSearchHovered(false)
                    }}
                    value={typedParams}
                    onChange={(event) => { setTypedParams(event.target.value) }}
                />
            </form>

            {searchHovered ? (
                <SearchSuggestions setParams={setTypedParams} />
            ) : (
                <div>
                    {searchResults.length === 0 ? (
                        <React.Fragment>
                            {typedParams.length === 0 ? (<React.Fragment>
                                <SearchSuggestions setParams={setTypedParams} />
                            </React.Fragment>) : (<div className="flex flex-col items-center py-8">
                                無結果
                            </div>
                            )}
                        </React.Fragment>
                    ) : (
                        <div>

                        </div>
                    )}
                </div>
            )
            }
        </div >
    )
}

const SearchSuggestions = ({
    setParams,
}: {
    setParams: Dispatch<SetStateAction<string>>
}) => {
    return (
        <div className="flex flex-col w-full items-center py-3 gap-2">
            <label className="w-4/5">其他人都在看：</label>
            <div className="flex flex-wrap w-4/5 gap-2">
                {["照顧年長者", "長照積分累積"].map(text => (
                    <p onClick={() => {
                        setParams(text)
                    }} className="bg-amber-700 px-3 rounded-md py-0.5 text-white">{text}</p>
                ))}
            </div>
        </div>
    )
}
