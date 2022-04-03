package main

import (
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"gitee.com/console/server/util"
	"github.com/BurntSushi/toml"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
	"io/ioutil"
	"log"
	"net/http"
)

var MysqlDb *sql.DB
var MysqlDbErr error

var (
	config = &struct {
		Server   string
		Username string
		Password string
		Database string
		Charset  string
	}{"127.0.0.1:3306", "root", "123456", "monibuca", "utf8"}
	ConfigRaw []byte
)

func init() {

	var err error
	addr := flag.String("c", "config.toml", "config file")
	flag.Parse()
	if err := util.CreateShutdownScript(); err != nil {
		util.Print("create shutdown script error:", err)
	}

	if ConfigRaw, err = ioutil.ReadFile(*addr); err != nil {
		util.Print("read config file error:", err)
		return
	}

	var cg map[string]interface{}

	if _, err = toml.Decode(string(ConfigRaw), &cg); err == nil {
		if cfg, ok := cg["Mysql"]; ok {
			b, _ := json.Marshal(cfg)
			if err = json.Unmarshal(b, config); err != nil {
				log.Println(err)
			}
		}
	} else {
		util.Print("decode config file error:", err)
	}

	//Golang数据连接："用户名:密码@tcp(IP:端口号)/数据库名?charset=utf8"
	dbDSN := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=%s", config.Username, config.Password, config.Server, config.Database, config.Charset)
	//打开数据库,前者是驱动名，所以要导入： _ "github.com/go-sql-driver/mysql"
	MysqlDb, err = sql.Open("mysql", dbDSN)
	if err != nil {
		//如果打开数据库错误，直接panic
		panic(err)
	}
	//设置数据库最大连接数
	MysqlDb.SetConnMaxLifetime(10)
	//设置上数据库最大闲置连接数
	MysqlDb.SetMaxIdleConns(5)
	//验证连接
	if err := MysqlDb.Ping(); err != nil {
		panic(err)
	}
}

func main() {
	defer MysqlDb.Close()
	showProcessList := util.QueryAndParseRows(MysqlDb, "select * from user")
	util.Print("多行数据-进程信息:%v\n", util.Data2Json(showProcessList))

	util.Print("server is ", config.Server)

	fmt.Println("start server at 9999")
	http.HandleFunc("/register", register)
	http.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("start server at 9999")
		conn, _, _, err := ws.UpgradeHTTP(r, w)
		if err != nil {
			// handle error
		}
		go func() {
			defer conn.Close()

			for {
				msg, op, err := wsutil.ReadClientData(conn)
				fmt.Println("read msg is " + string(msg))
				if err != nil {
				}
				err = wsutil.WriteServerMessage(conn, op, msg)
				if err != nil {
					// handle error
				}
			}
		}()
	})
	log.Fatal(http.ListenAndServe(":9999", nil))
}

/**
注册
*/
func register(w http.ResponseWriter, r *http.Request) {
	CORS(w, r)
	r.ParseForm()
	userName := r.Form["username"]
	fmt.Println("username is ", userName)
	password := r.Form.Get("password")
	mail := r.Form.Get("mail")
	ret, _ := MysqlDb.Exec("insert INTO user(mail,username,password) values(?,?,?)", mail, userName, password)

	//插入数据的主键id
	lastInsertID, _ := ret.LastInsertId()
	fmt.Println("LastInsertID:", lastInsertID)

	//影响行数
	rowsaffected, _ := ret.RowsAffected()
	fmt.Println("RowsAffected:", rowsaffected)
	if rowsaffected == 0 {
		resultData := make(map[string]string)
		resultData["code"] = "-1"
		resultData["msg"] = "注册失败"
		jsonData, _ := json.Marshal(resultData)
		w.Write(jsonData)
	}
}

func CORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	origin := r.Header["Origin"]
	if len(origin) == 0 {
		w.Header().Set("Access-Control-Allow-Origin", "*")
	} else {
		w.Header().Set("Access-Control-Allow-Origin", origin[0])
	}
}
