export type Language = 'en' | 'zh' | 'ja';

export const translations = {
  en: {
    title: 'Ender-Evac',
    subtitle: 'Automata Control Center',
    dashboard: 'Dashboard',
    dashboardDesc: 'Monitor server status and automated evacuation tasks.',
    manualShutdown: 'Trigger Evacuation',
    refresh: 'Refresh',
    settings: 'Settings',
    serverStatus: 'Server Status',
    running: 'Running',
    evacuating: 'Evacuating...',
    offline: 'Offline',
    uptime: 'Uptime',
    onlinePlayers: 'Online Players',
    activeTraffic: 'Active Traffic',
    idle: 'Idle',
    shutdownCountdown: 'Evacuation Countdown',
    inactivityThreshold: 'Inactivity duration threshold',
    estimatedClosing: 'Starts Running Away In',
    configuration: 'Timer Configuration',
    configDesc: 'Setup the inactivity threshold for automated evacuation.',
    settingsTitle: 'System Settings',
    settingsDesc: 'Configure integration, push notifications, and appearance.',
    evacuationTitle: 'Evacuation Protocol Status',
    evacuationDesc: 'Visual progress of the automated server termination sequence.',
    steps: {
      waiting: { title: 'Waiting for Evacuation', desc: 'Monitoring player activity and idle threshold.' },
      closing: { title: 'Closing Minecraft Server', desc: 'Safely disconnecting remaining services.' },
      maintenance: { title: 'Maintenance Disguise', desc: 'Deploying "Under Maintenance" facade.' },
      uploading: { title: 'GitHub Archive', desc: 'Compressing and pushing world files to repository.' },
      notifying: { title: 'Sending Good News', desc: 'Broadcasting the successful migration and evacuation.' },
      facade_shutdown: { title: 'Closing Maintenance Facade', desc: 'Decommissioning the temporary maintenance proxy.' },
      shutdown: { title: 'Final Shutdown', desc: 'Decommissioning server instance.' }
    },
    tabs: {
      timer: 'Timer',
      github: 'GitHub',
      announcements: 'Push',
      theme: 'Theme',
      language: 'Language'
    },
    timer: {
      label: 'Inactivity Threshold',
      placeholder: 'e.g. 1d 12h 30m',
      confirm: 'Confirm',
      currentlyActive: 'Currently active',
      hint: 'Supported units: s, m, h, d. Default is seconds (s).'
    },
    github: {
      repo: 'Repository URL',
      token: 'Access Token (Simulated)',
      hint: 'Used to push server archive when shutting down.'
    },
    push: {
      qq: 'QQ Group ID',
      website: 'Website URL',
      message: 'Shutdown Message'
    },
    theme: {
      darkMode: 'Dark Mode',
      darkModeDesc: 'Switch between light and dark themes.',
      accentColor: 'Primary Accent Color'
    },
    language: {
      label: 'System Language',
      select: 'Select Language'
    },
    footer: {
      copy: '© 2026 Ender-Evac.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    toasts: {
      inputRequired: 'Input Required',
      inputRequiredDesc: 'Please enter an inactivity threshold.',
      invalidUnit: 'Invalid Unit Detected',
      invalidUnitDesc: 'The part "{{part}}" is invalid. Please use s, m, h, or d.',
      configUpdated: 'Configuration updated successfully.'
    }
  },
  zh: {
    title: 'Ender-Evac',
    subtitle: '自动控制中心',
    dashboard: '仪表盘',
    dashboardDesc: '监控服务器状态和自动跑路任务。',
    manualShutdown: '立即跑路',
    refresh: '刷新',
    settings: '设置',
    serverStatus: '服务器状态',
    running: '运行中',
    evacuating: '跑路中...',
    offline: '离线',
    uptime: '运行时长',
    onlinePlayers: '在线玩家',
    activeTraffic: '活跃中',
    idle: '空闲',
    shutdownCountdown: '跑路倒计时',
    inactivityThreshold: '不活跃时长阈值',
    estimatedClosing: '预计跑路时间',
    configuration: '定时配置',
    configDesc: '设置自动跑路的不活跃时长阈值。',
    settingsTitle: '系统设置',
    settingsDesc: '配置集成、推送通知和外观。',
    evacuationTitle: '跑路协议状态',
    evacuationDesc: '自动服务器终止序列的可视化进度。',
    steps: {
      waiting: { title: '等待跑路', desc: '监控玩家活动和不活跃阈值。' },
      closing: { title: '关闭我的世界服务器', desc: '安全断开所有剩余服务。' },
      maintenance: { title: '伪装服务区维护中', desc: '部署“服务器维护”伪装。' },
      uploading: { title: '上传文件至 GitHub', desc: '压缩并推送世界文件至仓库。' },
      notifying: { title: '发送喜报', desc: '广播跑路成功及数据迁移完成的消息。' },
      facade_shutdown: { title: '关闭伪装服务器', desc: '撤除临时的“维护中”伪装代理。' },
      shutdown: { title: '彻底关机', desc: '正式停用服务器实例。' }
    },
    tabs: {
      timer: '定时器',
      github: 'GitHub',
      announcements: '推送',
      theme: '主题',
      language: '语言'
    },
    timer: {
      label: '不活跃阈值',
      placeholder: '例如: 1d 12h 30m',
      confirm: '确认',
      currentlyActive: '当前生效',
      hint: '支持单位: s (秒), m (分), h (时), d (天)。默认单位为秒。'
    },
    github: {
      repo: '仓库 URL',
      token: '访问令牌 (模拟)',
      hint: '用于在跑路时推送服务器归档。'
    },
    push: {
      qq: 'QQ 群 ID',
      website: '网站 URL',
      message: '跑路公告内容'
    },
    theme: {
      darkMode: '深色模式',
      darkModeDesc: '在亮色和深色主题之间切换。',
      accentColor: '主强调色'
    },
    language: {
      label: '系统语言',
      select: '选择语言'
    },
    footer: {
      copy: '© 2026 Ender-Evac.',
      privacy: '隐私政策',
      terms: '服务条款'
    },
    toasts: {
      inputRequired: '需要输入',
      inputRequiredDesc: '请输入不活跃阈值。',
      invalidUnit: '检测到无效单位',
      invalidUnitDesc: '部分 "{{part}}" 无效。请使用 s, m, h 或 d。',
      configUpdated: '配置已成功更新。'
    }
  },
  ja: {
    title: 'Ender-Evac',
    subtitle: 'オートマタコントロールセンター',
    dashboard: 'ダッシュボード',
    dashboardDesc: 'サーバーの状態と自動避難タスクを監視します。',
    manualShutdown: '即时避难',
    refresh: '更新',
    settings: '設定',
    serverStatus: 'サーバー状态',
    running: '実行中',
    evacuating: '避難中...',
    offline: 'オフライン',
    uptime: '稼働時間',
    onlinePlayers: 'オンラインプレイヤー',
    activeTraffic: 'アクティブ',
    idle: 'アイドル',
    shutdownCountdown: '避難カウントダウン',
    inactivityThreshold: '非アクティブ期間のしきい値',
    estimatedClosing: '避難開始まで',
    configuration: 'タイマー設定',
    configDesc: '自動シャットダウンの非アクティブしきい値を設定します。',
    settingsTitle: 'システム設定',
    settingsDesc: '連携、通知、外観を構成します。',
    evacuationTitle: '避難プロトコルステータス',
    evacuationDesc: '自動サーバー終了シーケンスの視覚的な進行状況。',
    steps: {
      waiting: { title: '避難待ち', desc: 'プレイヤーの活動としきい値を監視中。' },
      closing: { title: 'マインクラフト服务器を停止中', desc: '残りのサービスを安全に切断します。' },
      maintenance: { title: 'メンテナンス伪装', desc: '「メンテナンス中」の画面を展開します。' },
      uploading: { title: 'GitHub アーカイブ', desc: 'ファイルを压缩してリポジトリにプッシュします。' },
      notifying: { title: '喜報を送信', desc: '避難の成功とデータの移行完了を通知します。' },
      facade_shutdown: { title: '偽装サーバーを停止', desc: '一時的なメンテナンスプロキシを停止します。' },
      shutdown: { title: '最终シャットダウン', desc: 'サーバーインスタンスを正式に停止します。' }
    },
    tabs: {
      timer: 'タイマー',
      github: 'GitHub',
      announcements: 'プッシュ',
      theme: 'テーマ',
      language: '言語'
    },
    timer: {
      label: '非アクティブしきい値',
      placeholder: '例: 1d 12h 30m',
      confirm: '确认',
      currentlyActive: '现在有効',
      hint: 'サポートされている単位: s (秒), m (分), h (时), d (日)。デフォルトは秒です。'
    },
    github: {
      repo: 'リポジトリ URL',
      token: 'アクセストークン (シミュレート)',
      hint: '避難時にサーバーアーカイブをプッシュするために使用されます。'
    },
    push: {
      qq: 'QQグループID',
      website: 'ウェブサイト URL',
      message: '避難メッセージ'
    },
    theme: {
      darkMode: 'ダークモード',
      darkModeDesc: 'ライトテーマとダークテーマを切り替えます。',
      accentColor: 'メインアクセントカラー'
    },
    language: {
      label: '系统语言',
      select: '言語を选択'
    },
    footer: {
      copy: '© 2026 Ender-Evac.',
      privacy: 'プライバシーポリシー',
      terms: '利用規約'
    },
    toasts: {
      inputRequired: '入力が必要です',
      inputRequiredDesc: '非アクティブしきい値を入力してください',
      invalidUnit: '無効な単位が検出されました',
      invalidUnitDesc: '「{{part}}」は無効です。s, m, h, d を使用してください。',
      configUpdated: '设定が正常に更新されました。'
    }
  }
};