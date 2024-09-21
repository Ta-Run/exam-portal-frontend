import { useEffect, useState } from "react";

export function useDisablePrevDate() {

    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setMinDate(`${yyyy}-${mm}-${dd}`);
    }, [])

    return minDate;
}

export function useDisableNextDate() {

    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMaxDate(today)
    }, [])

    return maxDate;
}