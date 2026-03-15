import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F4F6FA"
},

/* HEADER */

header:{
paddingTop:55,
paddingHorizontal:20,
paddingBottom:35,
borderBottomLeftRadius:28,
borderBottomRightRadius:28
},

headerRow:{
flexDirection:"row",
alignItems:"center"
},

backButton:{
width:40,
height:40,
borderRadius:12,
backgroundColor:"rgba(255,255,255,0.25)",
justifyContent:"center",
alignItems:"center"
},

headerTextContainer:{
marginLeft:12
},

headerTitle:{
fontSize:20,
fontWeight:"700",
color:"#fff"
},

headerSubtitle:{
fontSize:13,
color:"#DBEAFE",
marginTop:2
},

/* CONTENT */

content:{
flex:1,
paddingHorizontal:20,
paddingTop:26
},

/* CATEGORY CARD */

categoryCard:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#FFFFFF",
padding:16,
borderRadius:18,
marginBottom:24,

shadowColor:"#000",
shadowOffset:{width:0,height:4},
shadowOpacity:0.08,
shadowRadius:8,
elevation:3
},

categoryIcon:{
width:46,
height:46,
borderRadius:12,
justifyContent:"center",
alignItems:"center",
marginRight:12
},

categoryText:{
fontSize:16,
fontWeight:"600",
color:"#111827"
},

subCategoryText:{
fontSize:13,
color:"#6B7280",
marginTop:2
},

/* LABEL */

label:{
fontSize:13,
fontWeight:"600",
color:"#6B7280",
marginBottom:8
},

/* AMOUNT INPUT */

amountInput:{
backgroundColor:"#FFFFFF",
borderRadius:16,
paddingHorizontal:18,
paddingVertical:16,
fontSize:20,
fontWeight:"700",
marginBottom:20,

borderWidth:1,
borderColor:"#E5E7EB",

shadowColor:"#000",
shadowOffset:{width:0,height:3},
shadowOpacity:0.04,
shadowRadius:4,
elevation:2
},

/* NORMAL INPUT */

input:{
backgroundColor:"#FFFFFF",
borderRadius:16,
paddingHorizontal:16,
paddingVertical:14,
fontSize:15,
marginBottom:28,

borderWidth:1,
borderColor:"#E5E7EB",

shadowColor:"#000",
shadowOffset:{width:0,height:2},
shadowOpacity:0.04,
shadowRadius:3,
elevation:2
},

/* TOTAL BOX */

totalBox:{
backgroundColor:"#FFFFFF",
borderRadius:16,
paddingVertical:16,
paddingHorizontal:18,
marginBottom:20,

borderWidth:1,
borderColor:"#E5E7EB",

shadowColor:"#000",
shadowOffset:{width:0,height:2},
shadowOpacity:0.05,
shadowRadius:4,
elevation:2
},

totalText:{
fontSize:18,
fontWeight:"700",
color:"#111827"
},

/* ADD QUANTITY BUTTON */

quantityToggle:{
marginBottom:14
},

quantityToggleText:{
color:"#3985F7",
fontWeight:"600",
fontSize:14
},

/* SAVE BUTTON */

saveButton:{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
backgroundColor:"#3985F7",
paddingVertical:16,
borderRadius:16,

shadowColor:"#3985F7",
shadowOffset:{width:0,height:6},
shadowOpacity:0.35,
shadowRadius:10,
elevation:5
},

saveText:{
color:"#fff",
fontSize:15,
fontWeight:"600",
marginLeft:8
},

});