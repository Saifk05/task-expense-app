import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F3F4F6"
},

/* HEADER */

header:{
paddingTop:55,
paddingBottom:35,
paddingHorizontal:20,
borderBottomLeftRadius:25,
borderBottomRightRadius:25
},

headerTop:{
flexDirection:"row",
alignItems:"center",
gap:10
},

backButton:{
width:36,
height:36,
borderRadius:10,
backgroundColor:"rgba(255,255,255,0.2)",
justifyContent:"center",
alignItems:"center"
},

headerTitle:{
fontSize:22,
fontWeight:"700",
color:"#FFFFFF"
},

headerSubtitle:{
fontSize:14,
color:"#EAF2FF",
marginTop:8,
marginLeft:36
},

/* SUMMARY */

summaryContainer:{
marginTop:-20,
paddingHorizontal:16
},

summaryRow:{
flexDirection:"row",
gap:12
},

summaryCard:{
flex:1,
backgroundColor:"#FFFFFF",
padding:16,
borderRadius:16,

shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:10,
elevation:3
},

summaryValue:{
fontSize:18,
fontWeight:"700",
marginTop:6,
color:"#1F2937"
},

summaryLabel:{
fontSize:12,
color:"#6B7280",
marginTop:2
},

/* SEARCH BAR */

searchContainer:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#FFFFFF",
marginHorizontal:16,
marginTop:16,
paddingHorizontal:12,
paddingVertical:10,
borderRadius:12,
gap:8,

shadowColor:"#000",
shadowOpacity:0.03,
shadowRadius:8,
elevation:1
},

searchInput:{
flex:1,
fontSize:14,
color:"#1F2937"
},

/* FILTER */

filterRow:{
flexDirection:"row",
gap:10,
marginTop:12,
marginHorizontal:16
},

filterChip:{
paddingHorizontal:14,
paddingVertical:6,
borderRadius:20,
backgroundColor:"#E5E7EB"
},

filterChipActive:{
backgroundColor:"#3B82F6"
},

filterText:{
fontSize:13,
color:"#374151"
},

filterTextActive:{
color:"#FFFFFF",
fontWeight:"600"
},

/* LIST */

list:{
padding:16,
paddingTop:20,
paddingBottom:120
},

/* CARD */

card:{
backgroundColor:"#FFFFFF",
borderRadius:16,
padding:14,
marginBottom:12,

shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:10,
elevation:2
},

row:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

leftSection:{
flexDirection:"row",
alignItems:"center",
gap:10
},

iconWrapper:{
width:36,
height:36,
backgroundColor:"#EEF4FF",
borderRadius:10,
justifyContent:"center",
alignItems:"center"
},

title:{
fontSize:16,
fontWeight:"600",
color:"#1F2937"
},

category:{
fontSize:12,
color:"#6B7280",
marginTop:2
},

rightSection:{
alignItems:"flex-end"
},

amount:{
fontSize:16,
fontWeight:"700"
},

date:{
fontSize:12,
color:"#9CA3AF",
marginTop:4
},

/* EMPTY STATE */

emptyContainer:{
alignItems:"center",
marginTop:60
},

emptyText:{
marginTop:10,
color:"#6B7280"
},

/* FLOATING BUTTON */

fab:{
position:"absolute",
right:20,
bottom:100,
backgroundColor:"#3B82F6",
width:60,
height:60,
borderRadius:30,
justifyContent:"center",
alignItems:"center",

shadowColor:"#000",
shadowOpacity:0.25,
shadowRadius:10,
elevation:8
}

});