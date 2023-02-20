export const checkLocalStorage = (setError: any): void => {
    let reqNumber = Number(localStorage.getItem('reqNumber'))
    reqNumber++
    localStorage.setItem('reqNumber', reqNumber.toString())
    if (reqNumber % 5 === 0) {
        setError(true)
        localStorage.removeItem('reqNumber')
    }
}

export const initLocalStorage = (): void => {
    const isBeenInit = localStorage.getItem('reqNumber')
    if (!isBeenInit) {
        localStorage.setItem('reqNumber', '0')
    }
}
