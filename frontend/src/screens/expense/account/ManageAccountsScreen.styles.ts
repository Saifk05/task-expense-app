import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F1F5F9"
},

header:{
backgroundColor:"#3B82F6",
paddingTop:55,
paddingHorizontal:20,
paddingBottom:45,
borderBottomLeftRadius:28,
borderBottomRightRadius:28
},

headerRow:{
flexDirection:"row",
alignItems:"center"
},

backButton:{
backgroundColor:"rgba(255,255,255,0.25)",
width:36,
height:36,
borderRadius:10,
justifyContent:"center",
alignItems:"center"
},

headerTitle:{
fontSize:22,
fontWeight:"700",
color:"#FFFFFF"
},

headerSubtitle:{
fontSize:13,
color:"#DBEAFE",
marginTop:4
},

summaryRow:{
flexDirection:"row",
justifyContent:"space-between",
paddingHorizontal:20,
marginTop:10,
marginBottom:24
},

balanceCard:{
flex:1,
height:115,
borderRadius:18,
padding:16,
marginRight:10,
justifyContent:"space-between",
backgroundColor:"#0F8F83",
shadowColor:"#000",
shadowOffset:{width:0,height:6},
shadowOpacity:0.12,
shadowRadius:8,
elevation:4
},

accountCardSummary:{
flex:1,
height:115,
borderRadius:18,
padding:16,
justifyContent:"space-between",
backgroundColor:"#0F8F83",
shadowColor:"#000",
shadowOffset:{width:0,height:6},
shadowOpacity:0.12,
shadowRadius:8,
elevation:4
},

cardTopRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

cardLabel:{
fontSize:13,
color:"#DBEAFE",
fontWeight:"500"
},

balanceValue:{
fontSize:30,
fontWeight:"700",
color:"#FFFFFF"
},

balanceHint:{
fontSize:12,
color:"#DBEAFE"
},

accountNumber:{
fontSize:32,
fontWeight:"700",
color:"#FFFFFF",
textAlign:"center"
},

accountStatus:{
fontSize:12,
color:"#DBEAFE",
textAlign:"center"
},

sectionTitle:{
fontSize:18,
fontWeight:"700",
marginBottom:14,
color:"#0F172A",
paddingHorizontal:20
},

accountCard:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#FFFFFF",
padding:16,
borderRadius:14,
marginHorizontal:20,
marginBottom:12,
shadowColor:"#000",
shadowOffset:{width:0,height:2},
shadowOpacity:0.06,
shadowRadius:4,
elevation:2
},

iconCircle:{
width:40,
height:40,
borderRadius:10,
justifyContent:"center",
alignItems:"center",
marginRight:12
},

accountName:{
fontSize:15,
fontWeight:"600",
color:"#0F172A"
},

accountType:{
fontSize:12,
color:"#64748B",
marginTop:2
},

accountBalance:{
fontSize:15,
fontWeight:"700",
color:"#0F172A"
},

viewButton:{
flexDirection:"row",
alignItems:"center",
marginTop:6,
paddingHorizontal:10,
paddingVertical:4,
borderRadius:10,
backgroundColor:"#EEF4FF"
},

viewText:{
fontSize:12,
fontWeight:"600",
color:"#3985F7",
marginLeft:4
},

sheetOverlay:{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
backgroundColor:"rgba(0,0,0,0.3)",
justifyContent:"flex-end"
},

bottomSheet:{
backgroundColor:"#FFFFFF",
padding:20,
borderTopLeftRadius:24,
borderTopRightRadius:24,
maxHeight:"85%"
},

dragHandle:{
width:40,
height:4,
backgroundColor:"#D1D5DB",
alignSelf:"center",
borderRadius:2,
marginBottom:12
},

sheetTitle:{
fontSize:18,
fontWeight:"700",
color:"#111827"
},

sheetSubtitle:{
fontSize:13,
color:"#6B7280",
marginBottom:20
},

sheetLabel:{
fontSize:14,
fontWeight:"600",
color:"#374151",
marginBottom:8
},

sheetInput:{
backgroundColor:"#F9FAFB",
borderRadius:12,
padding:14,
fontSize:16,
marginBottom:20,
borderWidth:1,
borderColor:"#E5E7EB"
},

sheetToggleRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:20
},

sheetUpdateButton:{
backgroundColor:"#3985F7",
paddingVertical:14,
borderRadius:12,
alignItems:"center"
},

sheetUpdateText:{
color:"#FFFFFF",
fontWeight:"600",
fontSize:15
},

sheetCancel:{
textAlign:"center",
marginTop:12,
color:"#6B7280"
},

fabMenu:{
position:"absolute",
bottom:160,
right:25,
backgroundColor:"#FFFFFF",
borderRadius:12,
paddingVertical:6,
paddingHorizontal:8,
shadowColor:"#000",
shadowOffset:{width:0,height:6},
shadowOpacity:0.15,
shadowRadius:10,
elevation:6
},

fabOption:{
flexDirection:"row",
alignItems:"center",
paddingVertical:10,
paddingHorizontal:10
},

fabText:{
marginLeft:8,
fontSize:14,
fontWeight:"500",
color:"#0F172A"
},



addButton:{
position:"absolute",
bottom:100,
right:25,
width:58,
height:58,
borderRadius:29,
backgroundColor:"#3B82F6",
justifyContent:"center",
alignItems:"center",
shadowColor:"#3B82F6",
shadowOffset:{width:0,height:6},
shadowOpacity:0.35,
shadowRadius:10,
elevation:6
},

loader:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

amountWords: {
  marginTop: 6,
  fontSize: 13,
  color: "#64748B",
  fontStyle: "italic"
},

});