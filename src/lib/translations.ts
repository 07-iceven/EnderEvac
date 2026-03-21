export type Language = 'en' | 'zh' | 'ja';

export const translations = {
  en: {
    title: 'Ender-Evac',
    subtitle: 'Automata Control Center',
    dashboard: 'Dashboard',
    dashboardDesc: 'Monitor server status and automated evacuation tasks.',
    manualShutdown: 'Trigger Evacuation',
    refresh: 'Refresh',
    serverStatus: 'Server Status',
    running: 'Running',
    offline: 'Offline',
    uptime: 'Uptime: 14 days, 2 hours',
    onlinePlayers: 'Online Players',
    activeTraffic: 'Active Traffic',
    idle: 'Idle',
    shutdownCountdown: 'Shutdown Countdown',
    inactivityThreshold: 'Inactivity duration threshold',
    estimatedClosing: 'Estimated Closing In',
    configuration: 'Configuration',
    configDesc: 'Setup automated shutdown and notification parameters.',
    evacuationTitle: 'Evacuation Protocol Status',
    evacuationDesc: 'Visual progress of the automated server termination sequence.',
    steps: {
      waiting: { title: 'Waiting for Evacuation', desc: 'Monitoring player activity and idle threshold.' },
      closing: { title: 'Closing Service Area', desc: 'Safely disconnecting remaining services.' },
      maintenance: { title: 'Maintenance Disguise', desc: 'Deploying "Under Maintenance" facade.' },
      uploading: { title: 'GitHub Archive', desc: 'Compressing and pushing world files to repository.' },
      notifying: { title: 'Community Notification', desc: 'Sending final messages to QQ and Website.' },
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
      copy: '© 2024 Ender-Evac. Developed for April 1st Release.',
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
    dashboardDesc: '监控服务器状态和自动关机任务。',
    manualShutdown: '立即跑路',
    refresh: '刷新',
    serverStatus: '服务器状态',
    running: '运行中',
    offline: '离线',
    uptime: '运行时长: 14天 2小时',
    onlinePlayers: '在线玩家',
    activeTraffic: '活跃中',
    idle: '空闲',
    shutdownCountdown: '关机倒计时',
    inactivityThreshold: '不活跃时长阈值',
    estimatedClosing: '预计关闭时间',
    configuration: '配置',
    configDesc: '设置自动关机和通知参数。',
    evacuationTitle: '跑路协议状态',
    evacuationDesc: '自动服务器终止序列的可视化进度。',
    steps: {
      waiting: { title: '等待跑路', desc: '监控玩家活动和不活跃阈值。' },
      closing: { title: '关闭服务区', desc: '安全断开所有剩余服务。' },
      maintenance: { title: '伪装服务区维护中', desc: '部署“服务器维护”伪装。' },
      uploading: { title: '上传文件至 GitHub', desc: '压缩并推送世界文件至仓库。' },
      notifying: { title: '社区通知', desc: '向 QQ 群和网站发送最后消息。' },
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
      hint: '用于在关机时推送服务器归档。'
    },
    push: {
      qq: 'QQ 群 ID',
      website: '网站 URL',
      message: '关机公告内容'
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
      copy: '© 2024 Ender-Evac. 专为 4月1日 发布开发。',
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
    dashboardDesc: 'サーバーの状態と自動シャットダウンタスクを監視します。',
    manualShutdown: '即時避難',
    refresh: '更新',
    serverStatus: 'サーバー状态',
    running: '実行中',
    offline: 'オフライン',
    uptime: '稼働時間: 14日 2時間',
    onlinePlayers: 'オンラインプレイヤー',
    activeTraffic: 'アクティブ',
    idle: 'アイドル',
    shutdownCountdown: 'シャットダウンカウントダウン',
    inactivityThreshold: '非アクティブ期間のしきい値',
    estimatedClosing: '予定終了時刻',
    configuration: '設定',
    configDesc: '自動シャットダウンと通知パラメータを設定します。',
    evacuationTitle: '避難プロトコルステータス',
    evacuationDesc: '自動サーバー終了シーケンスの視覚的な進行状況。',
    steps: {
      waiting: { title: '避難待ち', desc: 'プレイヤーの活動としきい値を監視中。' },
      closing: { title: 'サービスエリア閉鎖', desc: '残りのサービスを安全に切断します。' },
      maintenance: { title: 'メンテナンス偽装', desc: '「メンテナンス中」の画面を展開します。' },
      uploading: { title: 'GitHub アーカイブ', desc: 'ファイルを圧縮してリポジトリにプッシュします。' },
      notifying: { title: 'コミュニティ通知', desc: 'QQグループとウェブサイトに最終メッセージを送信。' },
      shutdown: { title: '最終シャットダウン', desc: 'サーバーインスタンスを正式に停止します。' }
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
      confirm: '確認',
      currentlyActive: '現在有効',
      hint: 'サポートされている単位: s (秒), m (分), h (時), d (日)。デフォルトは秒です。'
    },
    github: {
      repo: 'リポジトリ URL',
      token: 'アクセストークン (シミュレート)',
      hint: 'シャットダウン時にサーバーアーカイブをプッシュするために使用されます。'
    },
    push: {
      qq: 'QQグループID',
      website: 'ウェブサイト URL',
      message: 'シャットダウンメッセージ'
    },
    theme: {
      darkMode: 'ダークモード',
      darkModeDesc: 'ライトテーマとダークテーマを切り替えます。',
      accentColor: 'メインアクセントカラー'
    },
    language: {
      label: 'システム语言',
      select: '言語を選択'
    },
    footer: {
      copy: '© 2024 Ender-Evac. 4月1日リリースのために開発されました。',
      privacy: 'プライバシーポリシー',
      terms: '利用規約'
    },
    toasts: {
      inputRequired: '入力が必要です',
      inputRequiredDesc: '非アクティブしきい値を入力してください。',
      invalidUnit: '無効な単位が検出されました',
      invalidUnitDesc: '「{{part}}」は無効です。s, m, h, d を使用してください。',
      configUpdated: '設定が正常に更新されました。'
    }
  }
};
