export type Language = 'en' | 'zh' | 'ja';

export const translations = {
  en: {
    title: 'Ender Evac',
    subtitle: 'Automated Server Evacuation Tool',
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
    activeTraffic: 'Active',
    idle: 'Idle',
    shutdownCountdown: 'Evacuation Countdown',
    inactivityThreshold: 'Inactivity Threshold',
    estimatedClosing: 'Estimated Evacuation Time',
    configuration: 'Timer Config',
    configDesc: 'Configure the inactivity threshold for automated evacuation.',
    settingsTitle: 'Home Data Editor',
    settingsDesc: 'Manually override real-time data: uptime, countdown, online and max players.',
    editData: {
      uptime: 'Uptime (Seconds)',
      elapsed: 'Inactivity Elapsed (Seconds)',
      online: 'Online Players',
      max: 'Max Players',
      stepDurations: 'Step Durations (Seconds)',
      reset: 'Reset Simulation Data'
    },
    evacuationTitle: 'Evacuation Progress',
    evacuationDesc: 'Visual progress of the automated server termination sequence.',
    steps: {
      waiting: { title: 'Waiting for Evacuation', desc: 'Monitoring player activity' },
      closing: { title: 'Closing Minecraft Server', desc: 'Disconnecting services' },
      maintenance: { title: 'Maintenance Facade Active', desc: 'Deploying "Under Maintenance" facade' },
      uploading: { title: 'GitHub Archive', desc: 'Pushing files and open-sourcing' },
      notifying: { title: 'Sending "Good News"', desc: 'Broadcasting evacuation and source URL' },
      facade_shutdown: { title: 'Closing Maintenance Facade', desc: 'Removing temporary maintenance proxy' },
      shutdown: { title: 'Shutdown', desc: 'Saving electricity' }
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
      currentlyActive: 'Currently Active',
      hint: 'Supports: s (sec), m (min), h (hr), d (day). Default is seconds.'
    },
    github: {
      repo: 'Repository URL',
      token: 'Access Token (Simulated)',
      hint: 'Used to push server archive when evacuating.'
    },
    push: {
      qq: 'QQ Group ID',
      website: 'Website URL',
      message: 'Shutdown Message'
    },
    theme: {
      darkMode: 'Dark Mode',
      darkModeDesc: 'Switch between light and dark themes.',
      accentColor: 'Theme Color',
      customColor: 'Custom Color'
    },
    language: {
      label: 'System Language',
      select: 'Select Language'
    },
    footer: {
      copy: '© 2026 Ender Evac.',
      source: 'GitHub Repository'
    },
    toasts: {
      inputRequired: 'Input Required',
      inputRequiredDesc: 'Please enter an inactivity threshold.',
      invalidUnit: 'Invalid Unit Detected',
      invalidUnitDesc: 'The part "{{part}}" is invalid. Please use s, m, h, or d.',
      configUpdated: 'Configuration updated successfully.',
      simulationReset: 'Simulation data has been reset.'
    }
  },
  zh: {
    title: 'Ender Evac',
    subtitle: '服务器全自动跑路工具',
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
    settingsTitle: '主页数据修改',
    settingsDesc: '修改主页实时数据，包括运行时长、已倒计时时间、在线玩家与最多玩家数量',
    editData: {
      uptime: '运行时长 (秒)',
      elapsed: '已不活跃时间 (秒)',
      online: '在线玩家',
      max: '最多玩家数',
      stepDurations: '各步骤用时 (秒)',
      reset: '重置模拟数据'
    },
    evacuationTitle: '跑路进程',
    evacuationDesc: '自动服务器终止序列的可视化进度。',
    steps: {
      waiting: { title: '等待跑路', desc: '监控玩家活动' },
      closing: { title: '关闭 Minecraft 服务器', desc: '断开服务' },
      maintenance: { title: '伪装服务器维护中', desc: '部署“服务器维护”伪装' },
      uploading: { title: '上传文件至GitHub', desc: '推送服务器文件至仓库并开源' },
      notifying: { title: '发送喜报', desc: '广播跑路消息及开源地址' },
      facade_shutdown: { title: '关闭伪装服务器', desc: '撤除临时的“维护中”伪装' },
      shutdown: { title: '关机', desc: '节约用电' }
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
      accentColor: '主题色',
      customColor: '自定义颜色'
    },
    language: {
      label: '系统语言',
      select: '选择语言'
    },
    footer: {
      copy: '© 2026 Ender Evac.',
      source: 'GitHub URL'
    },
    toasts: {
      inputRequired: '需要输入',
      inputRequiredDesc: '请输入不活跃阈值。',
      invalidUnit: '检测到无效单位',
      invalidUnitDesc: '部分 "{{part}}" 无效。请使用 s, m, h 或 d。',
      configUpdated: '配置已成功更新。',
      simulationReset: '模拟数据已重置。'
    }
  },
  ja: {
    title: 'Ender Evac',
    subtitle: '服务器全自動避難ツール',
    dashboard: 'ダッシュボード',
    dashboardDesc: 'サーバーの状態と自動避難タスクを監視します。',
    manualShutdown: '即時避難',
    refresh: '更新',
    settings: '設定',
    serverStatus: 'サーバー状態',
    running: '稼働中',
    evacuating: '避難中...',
    offline: 'オフライン',
    uptime: '稼働時間',
    onlinePlayers: '在线プレイヤー',
    activeTraffic: 'アクティブ',
    idle: 'アイドル',
    shutdownCountdown: '避難カウントダウン',
    inactivityThreshold: '非アクティブしきい値',
    estimatedClosing: '避難予定時刻',
    configuration: 'タイマー設定',
    configDesc: '自动避難のための非アクティブしきい値を設定します。',
    settingsTitle: 'ホームデータ編集',
    settingsDesc: '稼働時間、カウントダウン、プレイヤー数などのリアルタイムデータを手動で上書きします。',
    editData: {
      uptime: '稼働時間 (秒)',
      elapsed: '非アクティブ経過 (秒)',
      online: 'オンライン',
      max: '最大人数',
      stepDurations: 'ステップ所要時間 (秒)',
      reset: 'シミュレーションデータをリセット'
    },
    evacuationTitle: '避難プロセス',
    evacuationDesc: '自动サーバー終了シーケンスの視覚的な進行状況。',
    steps: {
      waiting: { title: '避難待ち', desc: 'プレイヤーのアクティビティを監視中' },
      closing: { title: 'Minecraft服务器を停止', desc: 'サービスを切断します' },
      maintenance: { title: 'メンテナンス伪装を有効化', desc: '「メンテナンス中」の画面を展開します' },
      uploading: { title: 'GitHub アーカイブ', desc: 'ファイルをプッシュしてオープンソース化します' },
      notifying: { title: '「喜報」を送信', desc: '避難メッセージとソースURLを通知します' },
      facade_shutdown: { title: '伪装サーバーを停止', desc: '一時的な「メンテナンス中」の表示を撤去します' },
      shutdown: { title: 'シャットダウン', desc: '節電します' }
    },
    tabs: {
      timer: 'タイマー',
      github: 'GitHub',
      announcements: '通知',
      theme: 'テーマ',
      language: '言語'
    },
    timer: {
      label: '非アクティブしきい値',
      placeholder: '例: 1d 12h 30m',
      confirm: '確認',
      currentlyActive: '現在有効',
      hint: '単位: s (秒), m (分), h (時), d (日)。デフォルトは秒です。'
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
      accentColor: 'テーマカラー',
      customColor: 'カスタムカラー'
    },
    language: {
      label: 'システム言語',
      select: '言語を選択'
    },
    footer: {
      copy: '© 2026 Ender Evac.',
      source: 'GitHub URL'
    },
    toasts: {
      inputRequired: '入力が必要です',
      inputRequiredDesc: '非アクティブしきい値を入力してください。',
      invalidUnit: '無効な単位が検出されました',
      invalidUnitDesc: '「{{part}}」は无効です。s, m, h, d を使用してください。',
      configUpdated: '設定が正常に更新されました。',
      simulationReset: 'シミュレーションデータがリセットされました。'
    }
  }
};