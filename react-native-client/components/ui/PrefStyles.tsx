import { StyleSheet } from 'react-native'

export const fontfamily = 'Helvetica'
export const primaryColor = '#fff'
export const secondaryColor = '#FFAE00'
export const tertiaryColor = '#363636'
export const bgColor = '#4E4E4E'

export const mainScreenStyles = StyleSheet.create({
    titleText: {
        color: primaryColor,
        fontFamily: fontfamily,
        fontSize: 80,
        marginBlockStart: 100,
        marginLeft: 70
    },
    smallTitleText: {
        color: secondaryColor,
        fontFamily: fontfamily,
        fontSize: 35,
    },
    text: {
        color: primaryColor,
        fontFamily: fontfamily,
        fontSize: 23,
    },
    subtitleText: {
        color: primaryColor,
        fontFamily: fontfamily,
        fontSize: 18,
    },
    titleIconImage: {
        position: 'absolute',
        top: -150,
        left: -170,
    }
})

export const authScreenStyles = StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: bgColor,
    },
    text: {
        color: primaryColor,
        marginLeft: 60,
        fontFamily: fontfamily,
    },
    input: {
        flex: 1,
        color: 'white',
        marginRight: 200,
        borderColor: primaryColor,
        borderWidth: 1,
        paddingBlockStart: 10,
        paddingBlockEnd: 10,
        borderCurve: 'circular',
        borderRadius: 5,
    },
    view: {
        marginBlockStart: 350,
        backgroundColor: tertiaryColor,
        paddingBlockStart: 50
    },
    button: {
        marginLeft: 60,
        alignItems: 'center',
        backgroundColor: secondaryColor,
        borderColor: secondaryColor,
        borderRadius: 10,
        borderWidth: 10,
        marginBlockEnd: 60,
        width: 200,
    }
})