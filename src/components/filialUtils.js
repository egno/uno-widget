export function filialCity (selectedFilial) {
    const locality = selectedFilial &&
        selectedFilial.j &&
        selectedFilial.j.address &&
        selectedFilial.j.address.addressComponents &&
        selectedFilial.j.address.addressComponents.find(
            x => x.kind === "locality"
        )
    return locality && locality["name"]
}

export function filialAddress (selectedFilial) {
    return (
        selectedFilial &&
        selectedFilial.j &&
        selectedFilial.j.address &&
        (selectedFilial.j.address.cityAddress) || selectedFilial.j.address.name
    )
}

export function filialFullAddress (selectedFilial) {
    return (
        selectedFilial &&
        selectedFilial.j &&
        selectedFilial.j.address &&
        (selectedFilial.j.address.name)
    )
}

export function filialName (selectedFilial) {
    return (
        selectedFilial &&
        selectedFilial.j &&
        selectedFilial.j.name
    )
}

export function filialEmployees (selectedFilial) {
    return (
        selectedFilial &&
        selectedFilial.j &&
        +selectedFilial.j.employees
    )
}

